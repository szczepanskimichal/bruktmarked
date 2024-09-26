// import { mongooseConnect } from "@/lib/mongoose";
// import { Category } from "@/models/Category";
// export default async function handle(req, res) {
//   const { method } = req;
//   await mongooseConnect();
//   if (method === "GET") {
//     res.json(await Category.find());
//   }
//   if (method === "POST") {
//     const { name } = req.body;
//     const category = await Category.create({ name });
//     res.json(category);
//   }
//   if (method === "PUT") {
//     const { name, _id } = req.body;
//     const category = await Category.updateOne({ _id }, { name });
//     res.json(category);
//   }
//   if (method === "DELETE") {
//     const { _id } = req.query;
//     await Category.deleteOne({ _id });
//     res.json("ok");
//   }
// }

import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;

  try {
    await mongooseConnect();

    if (method === "GET") {
      const categories = await Category.find();
      return res.status(200).json(categories);
    }

    if (method === "POST") {
      const { name } = req.body;

      // Validate request body
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const category = await Category.create({ name });
      return res.status(201).json(category);
    }

    if (method === "PUT") {
      const { name, _id } = req.body;

      // Validate request body
      if (!name || !_id) {
        return res.status(400).json({ error: "Name and ID are required" });
      }

      const category = await Category.updateOne({ _id }, { name });
      if (category.matchedCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json({ message: "Category updated successfully" });
    }

    if (method === "DELETE") {
      const { _id } = req.query;

      if (!_id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const result = await Category.deleteOne({ _id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json({ message: "Category deleted successfully" });
    }

    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
}
