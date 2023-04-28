"use client";
import Typography from "@mui/material/Typography";
import {  Chip, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

export async function getProductById(productId: any) {
  console.log(productId);
  const res = await fetch("http://localhost:8080" + "/products/" + productId, {
    cache: "no-store",
  });
  const data = await res.json();
  const resp = data;
  return resp as any;
}

export default async function loadProduct({ params }: any) {
  const product = await getProductById(params.id);
  return (
    <div>
      <div className={styles.pageMargins}>
        <img
          src={product.image.src}
          alt={product.image.alt}
          className={styles.imageStyle}
        />

        <div className={styles.padding}>
          <h1 >{product.title}</h1>
          <p className={styles.padding}> Vendor: {product.vendor}</p>
          <p className={styles.padding}>{product.product_type}</p>
          <p className={styles.padding}>{product.body_html}</p>
          {product.tags && (
            <div className={styles.padding}>
              Tags : 
              {product.tags.split(",").map((tag: string, index: any) => (
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
            </div>
          )}
          <div style={{ padding: "5px", margin:"33px" }}>
            Variants available:
            <ol style={{ margin:"33px"}}>
          {product.variants.map((variant: any, index: any) => (
                <li key={index} >
                  {`Price: $ ${variant.price}`}
                </li>
              ))}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}
