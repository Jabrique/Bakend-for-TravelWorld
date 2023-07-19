import Tour from "../models/Tour.js";

// create new tour
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create tour" });
  }
};


// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update tour" });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete tour" });
  }
};

// get single tour

// get all tours
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page);
  
    try {
      const pageSize = 8;
      const totalCount = await Tour.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);
  
      const tours = await Tour.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.status(200).json({
        success: true,
        count: tours.length,
        message: "Tours retrieved successfully",
        data: tours,
        page,
        totalPages,
        totalCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to get tours" });
    }
  };
export const getFeaturedTour = async (req, res) => {  
    try {
      const pageSize = 8;
  
      const tours = await Tour.find({featured:true})
        .limit(pageSize);
  
      res.status(200).json({
        success: true,
        message: "Tours retrieved successfully",
        data: tours,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to get tours" });
    }
  };

  export const getTourBySearch = async (req, res) => {
    const { city, distance, maxGroupSize } = req.query;
  
    const query = {};
  
    if (city) {
      query.city = city;
    }
  
    if (distance) {
      query.distance = { $gte: parseInt(distance) };
    }
  
    if (maxGroupSize) {
      query.maxGroupSize = { $gte: parseInt(maxGroupSize) };
    }
  
    try {
      const tours = await Tour.find(query);
  
      res.status(200).json({
        success: true,
        count: tours.length,
        message: "Search results retrieved successfully",
        data: tours,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to search for tours" });
    }
  };


export const getTourCount = async(req,res) =>{
  try{
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Tours count successfully",
      data: tourCount,
    });
  }catch(err){
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get tours" });
  }
}
  
  
export default {
  createTour,
  deleteTour,
  updateTour,
  getAllTour,
  getFeaturedTour,
  getTourBySearch,
  getTourCount
};