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
