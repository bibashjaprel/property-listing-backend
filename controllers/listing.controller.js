import { PrismaClient } from '../lib/generated/prisma/index.js';
const prisma = new PrismaClient();

export const getListing = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({});
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      price_type,
      address,
      latitude,
      longitude,
      features,
      expires_at,
    } = req.body;

    const created_by = req.user.userId;

    if (!title || !category || !price || !price_type || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        price: parseFloat(price),
        price_type,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        features,
        expires_at: expires_at ? new Date(expires_at) : null,
        created_by,
      },
    });

    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const singleListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
}


export const updateListing = async (req, res) => {
  const { userId, role } = req.user;
  const { id } = req.params;

  try {
    const listingId = parseInt(id, 10);

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Check if the user is admin or owner
    if (role !== 'admin' && listing.created_by !== userId) {
      return res.status(403).json({ error: 'You are not allowed to update this listing' });
    }

    const {
      title,
      description,
      category,
      price,
      price_type,
      address,
      latitude,
      longitude,
      features,
      expires_at,
    } = req.body;

    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: {
        title,
        description,
        category,
        price: price ? parseFloat(price) : undefined,
        price_type,
        address,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        features,
        expires_at: expires_at ? new Date(expires_at) : undefined,
      },
    });

    res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Failed to update listing' });
  }
};


export const deleteListing = async (req, res) => {
  const { userId, role } = req.user;
  const listingId = parseInt(req.params.id, 10);

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Check if the user is an admin or the creator of the listing
    if (role !== 'admin' && listing.created_by !== userId) {
      return res.status(403).json({ error: 'You are not allowed to delete this listing' });
    }

    await prisma.listing.delete({
      where: { id: listingId },
    });

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

