import { PrismaClient } from '../lib/generated/prisma/index.js';
const prisma = new PrismaClient();

export const getAllListingsForAdmin = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      // You can add more info here if you want
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

export const updateAnyListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id, 10);

    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: req.body,
    });

    res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

export const deleteAnyListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.id, 10);

    await prisma.listing.delete({ where: { id: listingId } });

    res.status(204).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};
