import intern from "../../models/intern";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body);
        const { email, rep, depdate, depno, period, stay, cgpa, back, acc, code } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        try {
            let user = await intern.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            let updatedUser = await intern.findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        reportingofficer: rep,
                        depdate: depdate,
                        depno: depno,
                        period: period,
                        stay: stay,
                        cgpa: cgpa,
                        back: back,
                        acc: acc,
                        code: code
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found or fields not filled" });
            }

            console.log(updatedUser);
            return res.status(200).json({ success: "Hogya form fill!!", updatedUser });

        } catch (error) {
            console.error("Database update error:", error);
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }

    } else {
        return res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
