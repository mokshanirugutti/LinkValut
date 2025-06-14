import { Request, Response } from 'express';
import { Link } from '../models/LinkModel';


export const createLink = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, url, tags } = req.body;
        const link = new Link({ title, url, tags, createdBy: req.userId });
        await link.save();
        res.status(201).json({
            message: 'Link created successfully',
            link
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getLinksByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        let { tag } = req.query;
        const query: any = { createdBy: req.userId };

        if (tag) {
            let tagsArray: string[] = [];

            if (Array.isArray(tag)) {
                
                tagsArray = tag as unknown as string[];
            } else if (typeof tag === 'string') {
                
                tagsArray = tag.split(',').map(t => t.replace(/^"+|"+$/g, '').trim());
            }

            query.tags = { $all: tagsArray };
        }

        const links = await Link.find(query);
        res.status(200).json(links);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}


export const deleteLink = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const link = await Link.findOneAndDelete({ _id: id, createdBy: req.userId });

        if (!link) {
            res.status(404).json({ message: 'Link not found or not authorized' });
            return;
        }

        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
