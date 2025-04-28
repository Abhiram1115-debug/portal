const Item = require('../models/item');

// Add new item
exports.addItem = async (req, res) => {
  try {
    const { imageUrl, description, contactDetails, category } = req.body;

    const newItem = new Item({
      imageUrl,
      description,
      contactDetails,
      category,
      createdBy: req.user.id,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item submitted for approval' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item' });
  }
};

// Get all approved items
exports.getApprovedItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'approved' });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

// Approve an item
exports.approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'approved';
    await item.save();

    res.json({ message: 'Item approved' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving item' });
  }
};

// Mark item as claimed
exports.claimItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.status = 'claimed';
    await item.save();

    res.json({ message: 'Item marked as claimed' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking item claimed' });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};
