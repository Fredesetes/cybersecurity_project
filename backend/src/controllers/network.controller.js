import csv from 'csvtojson';
import { Parser } from 'json2csv';
import path from 'path';
import db from '../models/index.js';

const Network = db.Network;
const Op = db.Sequelize.Op;

export const findAll = async (req, res, next) => {
  try {
    const networks = await Network.findAll();

    if(networks.length == 0) return res.json({});
    
    return res.json(networks);
  } catch(error) { next(error); }
}

export const findWithSearch = async (req, res, next) => {
  try {
    const findParameter = Object.keys(req.query)[0];
    const findBy = {
      bssid: findByBssid,
      essid: findByEssid,
      security: findBySecurity
    }

    const findByFn = findBy[findParameter];

    if(!findByFn) {
      const error = new Error(`Invalid Search Argument :: ${findParameter}`);
      res.status(400);
      return next(error);
    }

    return findByFn(req, res, next);
  } catch(error) { next(error); }
}

export const findByBssid = async (req, res, next) => {
  try {
    const value = req.query.bssid;

    const networks = await Network.findOne({
      where: { bssid: value }
    });

    if(!networks) return res.json({});

    return res.json(networks);
  } catch(error) { next(error); }
}

export const findByEssid = async (req, res, next) => {
  try {
    const value = req.query.essid;

    const networks = await Network.findAll({
      where: { essid: value }
    });

    if(networks.length == 0) return res.json([]);

    return res.json(networks);
  } catch(error) { next(error); }
}

export const findBySecurity = async (req, res, next) => {
  try {
    const value = req.query.security;

    const networks = await Network.findAll({
      where: { privacy: { [Op.like]: `%${value}%` } }
    });

    if(networks.length == 0) return res.json([]);

    return res.json(networks);
  } catch(error) { next(error); }
}

export const statistics = async (req, res, next) => {
  try {
    const wepNetworks = await Network.count({
      where: { privacy: { [Op.like]: `%WEP%` } }
    });
    const wpaNetworks = await Network.count({
      where: { privacy: { [Op.like]: `%WPA%` } }
    });
    const openNetworks = await Network.count({
      where: { privacy: { [Op.like]: `%OPN%` } }
    });

    return res.json({
      WEP: wepNetworks,
      WPA: wpaNetworks,
      OPEN: openNetworks
    });
  } catch(error) { next(error); }
}

export const create = async (req, res, next) => {
  try {
    const networkJson = req.body;
    if(!networkJson.bssid || !networkJson.essid || !networkJson.privacy || !networkJson.cipher || !networkJson.auth) {
      const error = new Error(`Invalid Network Object!`);
      res.status(400);
      return next(error);
    }

    // if(networkJson.latitude) networkJson.latitude = Number(networkJson.latitude);
    // if(networkJson.longitude) networkJson.longitude = Number(networkJson.longitude);

    const createdNetwork = await Network.create(networkJson);
    
    return res.json(createdNetwork);
  } catch(error) { next(error); }
}

export const importer = async (req, res, next) => {
  try {
    const file = req.file;
    const pathToFile = path.join(process.cwd(), 'uploads', file.filename);
    let jsonCsv = await csv().fromFile(pathToFile);

    jsonCsv = jsonCsv.map((network) => {
      const gps = network.gps.split(';');
      delete network.gps;
      return { ...network, latitude: Number(gps[0].trim()), longitude: Number(gps[1].trim()) }
    });

    const createdNetworks = await Network.bulkCreate(jsonCsv, { returning: true, ignoreDuplicates: true });
    
    return res.json(createdNetworks);
  } catch(error) { next(error); }
}

export const update = async (req, res, next) => {
  try {
    const networkBssid = req.params.bssid;
    const networkJson = req.body;

    if(!networkJson.bssid || !networkJson.essid || !networkJson.privacy || !networkJson.cipher || !networkJson.auth || !networkJson.cracked) {
      const error = new Error(`Invalid Network Object!`);
      res.status(400);
      return next(error);
    }

    const rows = await Network.update(networkJson, {
      where: { bssid: networkBssid }
    });

    if(rows == 1) {
      return res.json({
        message: "Network was updated successfully!"
      });
    } else {
      return res.json({
        message: `Cannot update Network with bssid :: ${networkBssid}!`
      });
    }
  } catch(error) { next(error); }
}

export const exporter = async (req, res, next) => {
  try {
    const exportParameter = req.query.type;

    if(exportParameter != "csv" && exportParameter != "json") {
      const error = new Error(`Invalid Export Type :: ${exportParameter}`);
      res.status(400);
      return next(error);
    }

    const networks = await Network.findAll();

    if(exportParameter == "csv") {
      const fields = [ 'bssid', 'channel', 'privacy', 'cipher', 'auth', 'channel', 'essid', 'latitude', 'longitude' ];
      const csv = new Parser({ fields }).parse(networks);
      res.header('Content-Type', 'text/csv');
      res.attachment("networks.csv");

      return res.send(csv);
    } else {
      res.header('Content-Type', 'text/json');
      res.attachment("networks.json");

      return res.send(networks);
    }
  } catch(error) { next(error); }
}

export const deleteAll = async (req, res, next) => {
  try {
    const rows = await Network.destroy({
      where: {},
      truncate: false
    });

    return res.json({
      message: `${rows} Networks were deleted successfully!`
    })
  } catch(error) { next(error); }
}

export const deleteOne = async (req, res, next) => {
  try {
    const networkBssid = req.params.bssid;

    const rows = await Network.destroy({
      where: { bssid: networkBssid }
    });

    if(rows == 1) {
      return res.json({
        message: "Network was deleted successfully!"
      });
    } else {
      return res.json({
        message: `Cannot delete Network with bssid :: ${networkBssid}!`
      });
    }
  } catch(error) { next(error); } 
}