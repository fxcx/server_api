import { prisma } from "../database/database.js";
import httpStatus from "http-status";

export const productController = () => {
  const createProduct = async (req, res, next) => {
      try {
      const { name, price, stock, category } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          price,
          stock,
          category,
        },
      });
       res.status(httpStatus.CREATED).json(product);
     } catch (error) {
       next(error);
     } finally {
      await prisma.$disconnect()
     }
    }
  

  const getAllProducts = async (req, res, next) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      next(error);
    } finally {
     await prisma.$disconnect()
    }

  const getProductById = async (req, res, next) => {
     try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!product) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect()
  };

  const updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, stock, category } = req.body;
      const updatedProduct = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          price,
          stock,
          category,
        },
      });
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    } finally {
     await prisma.$disconnect()
  };

  const deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.product.delete({
        where: {
          id: parseInt(id),
        },
      })
      res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    } finally {
        await prisma.$disconnect()
  }

  return {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  }
}