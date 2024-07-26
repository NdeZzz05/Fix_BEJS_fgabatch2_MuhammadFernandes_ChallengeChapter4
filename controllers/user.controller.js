const USER_SERVICES = require("../services/user.services");

getAllUser = async (req, res, next) => {
  try {
    const result = await USER_SERVICES.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await USER_SERVICES.getDetailUser(id);
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createUser = async (req, res, next) => {
  try {
    let data = req.body;
    const result = await USER_SERVICES.createUser(data);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let data = req.body;
    const result = await USER_SERVICES.updateUser(id, data);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await USER_SERVICES.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUser, getDetailUser, createUser, updateUser, deleteUser };
