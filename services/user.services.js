const prisma = require("../config/prisma");
const { NotFoundError, BadRequest } = require("../errors/customsErrors");
const USER_MODELS = require("../models/user.models");

const USER_SERVICES = {
  getAllUser: async () => {
    const result = await USER_MODELS.getAllUser();
    return result;
  },

  getDetailUser: async (id) => {
    const result = await USER_MODELS.getDetailUser(id);

    if (!result) {
      throw new NotFoundError("User not found");
    }

    return result;
  },

  createUser: async (data) => {
    if (!data.name || !data.email || !data.password || !data.identity_type || !data.identity_number || !data.street || !data.city || !data.state || !data.postal_code || !data.country || !data.company_name || !data.position) {
      throw new BadRequest("Please fill in all the required fields");
    }

    try {
      const result = await USER_MODELS.createUser(data);
      return result;
    } catch (error) {
      if (error.code === "P2002" && error.meta.target.includes("email")) {
        throw new BadRequest("Email already exists");
      } else if (error.code === "P2002" && error.meta.target.includes("identity_number")) {
        throw new BadRequest("Identity number already exists");
      }

      return error;
    }
  },

  updateUser: async (id, data) => {
    if (!data.name || !data.email || !data.password || !data.identity_type || !data.identity_number || !data.street || !data.city || !data.state || !data.postal_code || !data.country || !data.company_name || !data.position) {
      throw new BadRequest("Please fill in all the required fields");
    }

    try {
      const result = await USER_MODELS.updateUser(id, data);

      return result;
    } catch (error) {
      if (error.code === "P2002" && error.meta.target.includes("email")) {
        throw new BadRequest("Email already exists");
      } else if (error.code === "P2002" && error.meta.target.includes("identity_number")) {
        throw new BadRequest("Identity number already exists");
      } else if (error.code === "P2025") {
        throw new BadRequest("User not found");
      }

      return error;
    }
  },

  deleteUser: async (id) => {
    const checkUser = await prisma.users.findUnique({
      where: { id },
    });
    if (!checkUser) {
      throw new NotFoundError("User not found");
    }

    try {
      const result = await USER_MODELS.deleteUser(id);
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = USER_SERVICES;
