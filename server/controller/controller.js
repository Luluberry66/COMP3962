// this file is for test purpose

export const testPost = async (req, res) => {
    res.json({ message: req.body.message });
};