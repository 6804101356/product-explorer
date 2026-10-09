"use server";

import { auth } from "@/auth";
import { deleteProduct, updateProduct } from "@/lib/products";
import { ProductDraftSchema } from "@/app/lib/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function updateProductAction(id: number, formData: FormData) {
  await requireUser();

  const parsed = ProductDraftSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    category: String(formData.get("category") ?? ""),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  updateProduct(id, parsed.data);

  revalidatePath("/");
  redirect("/");
}

export async function deleteProductAction(id: number) {
  await requireUser();
  deleteProduct(id);
  revalidatePath("/");
  redirect("/");
}
