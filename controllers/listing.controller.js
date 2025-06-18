import { PrismaClient } from '../lib/generated/prisma/index.js';
const prisma = new PrismaClient();

export const getListing = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const skip = (page - 1) * limit

    const [listings, totalCount] = await Promise.all([
      prisma.listing.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.listing.count(),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    res.status(200).json({
      listings,
      totalPages,
      currentPage: page,
      totalCount,
    })
  } catch (error) {
    console.error('Error fetching listings:', error)
    res.status(500).json({ error: 'Failed to fetch listings' })
  }
}


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
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const listingId = parseInt(id, 10);
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });

    if (!listing || listing.created_by !== userId) {
      return res.status(403).json({ error: 'You can only update your own listings' });
    }

    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: req.body,
    });

    res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
};



export const deleteListing = async (req, res) => {
  const { userId } = req.user;
  const listingId = parseInt(req.params.id, 10);

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Only allow deletion if user created the listing
    if (listing.created_by !== userId) {
      return res.status(403).json({ error: 'You can only delete your own listings' });
    }

    await prisma.listing.delete({ where: { id: listingId } });

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
