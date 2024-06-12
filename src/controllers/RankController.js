const sharp = require('sharp');
const path = require('path');
const dotenv = require('dotenv');
const RankService = require('../services/RankService');
const { srcPath } = require('../../pathHelper');

dotenv.config();

const pathstore = srcPath;

class RankController {
    // [POST] api/rank/create-rank
    async createRank(req, res) {
        try {
            const { nameUser, description, numberRank } = req.body;
            if (!nameUser || !description || !numberRank) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const response = {
                ...req.body,
            };
            const images = req.file;
            if (images) {
                response.image = images.path;
            } else {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The avt is required',
                });
            }
            const responseService = await RankService.createRank(response);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getRank(req, res) {
        try {
            const page = req.params.page || 0;
            const responseService = await RankService.getRank(page);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getAllRank(req, res) {
        try {
            const responseService = await RankService.getAllRank();
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getDetailsRank(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The id is required',
                });
            }
            const responseService = await RankService.getDetailsRank(id);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async deleteRank(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(200).json({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            }
            const responseService = await RankService.deleteRank(id);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async updateRank(req, res) {
        try {
            const { id, nameUser, numberRank, description } = req.body;
            if (!id || !nameUser || !description || !numberRank) {
                return res.status(200).json({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            }
            const responseService = await RankService.updateRank(req.body);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async totalRank(req, res) {
        try {
            const responseService = await RankService.totalRank();
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
}

module.exports = new RankController();
