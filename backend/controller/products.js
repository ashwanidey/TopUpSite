import Product from "../models/Products.js";

export const getGames = async(req,res) => {
  try{
    const games = await Product.find({type : "games", instock: "true"});
    res.status(200).json(games);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}

export const getOtt = async(req,res) => {
  try{
    const ott = await Product.find({type : "ott", instock : "true"});
    res.status(200).json(ott);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}

export const getTrending = async(req,res) => {
  try{
    const trending = await Product.find({istrending : "true", instock: "true"});
    res.status(200).json(trending);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}


export const getProduct = async(req,res) => {
  try{
    const {productId} = req.params
    const product = await Product.findById(productId);
    res.status(200).json(product);
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
}


export const getAllProducts = async(req,res) => {
  try{
    const product = await Product.find();
    res.status(200).json(product);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
}