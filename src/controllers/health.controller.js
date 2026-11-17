const getHealth = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Server is running successfully",
      status: "OK",
    });
  } catch (error) {
    new Error("run time error");
  }
};

module.exports = { getHealth };
