const NewsService = require('../services/NewsService');
const sharp = require('sharp');
const path = require('path');
const dotenv = require('dotenv');
const { srcPath } = require('../../pathHelper');

dotenv.config();

const pathstore = srcPath;

class NewsController {
    // [POST] api/news/create-news
    async createNews(req, res) {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const response = {
                ...req.body,
            };
            const images = req.files;
            const urlImages = [];
            if (images) {
                await Promise.all(
                    images.map(async (imageItem) => {
                        urlImages.push(imageItem.path);
                    }),
                );
                response.image = urlImages;
            }
            const responseService = await NewsService.createNews(response);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getNews(req, res) {
        try {
            const page = req.params.page || 0;
            const responseService = await NewsService.getNews(page);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getDetailsNews(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The id is required',
                });
            }
            const responseService = await NewsService.getDetailsNews(id);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async deleteNews(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(200).json({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            }
            const responseService = await NewsService.deleteNews(id);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async updateNews(req, res) {
        try {
            const { id, title, description } = req.body;
            console.log(req.body);
            if (!id || !title || !description) {
                return res.status(200).json({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            }
            const responseService = await NewsService.updateNews(req.body);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async totalNews(req, res) {
        try {
            const responseService = await NewsService.totalNews();
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
}

module.exports = new NewsController();
