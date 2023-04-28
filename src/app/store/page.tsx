"use client";
import { Shopify } from "@shopify/shopify-api";
import styles from "./page.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import { Key } from "react";
import Link from "next/link";

export async function getProducts() {
  const res = await fetch("http://localhost:8080" + "/products/", {
    cache: "no-store",
  });
  const data = await res.json();
  const resp = data.products;
  return resp as any[];
}

export default async function Storepage() {
  const products = await getProducts();
  return (
    <div className={styles.pageMargins}>
      <Typography gutterBottom variant="h2" component="div">
        Products
      </Typography>
      <div className={styles.container}>
        {products.map((product, index) => (
          <Card sx={{ maxWidth: 370 }} key={index}>
            <CardActionArea>
              <Link href={`store/product/${product.id}`}>
                <CardMedia
                  component="img"
                  height="340"
                  image={
                    (product.image && product.image.src) ||
                    "https://cdn.shopify.com/s/files/1/0749/9661/3417/products/gift_card.png?v=1682411646"
                  }
                />
              </Link>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>

                {product.variants && (
                  <Typography variant="body2" color="text.primary">
                    {`Price: $ ${Math.min(
                      ...product.variants.map(
                        (variant: { price: any }) => variant.price
                      )
                    )}`}
                  </Typography>
                )}

                {product.tags && (
                  <Typography variant="body2" color="text.primary">
                    {product.tags
                      .split(",")
                      .map((tag: string, index: Key | null | undefined) => (
                        <span key={index}>
                          <Chip
                            label={tag.trim()}
                            color="primary"
                            sx={{
                              marginRight: "0.5rem",
                              marginBottom: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          />
                          {index !== product.tags.split(",").length - 1 && " "}
                        </span>
                      ))}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
}
