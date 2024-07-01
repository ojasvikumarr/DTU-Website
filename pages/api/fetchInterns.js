import connectDb from "../../middleware/mongoose";
import Intern from "../../models/intern"
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            const user = req.body.user.user;
            // console.log(user.department);
            const interns = await Intern.find({ department: user.department });
            // console.log(interns);
            if (!interns) {
                res.status(200).json({ success: "No interns deployed yet" })
            }
            // Initialize an object to hold the grouped interns
            let groupedInterns = {};

            // Iterate through each intern
            interns.forEach((intern) => {
                // Check if the year already exists as a key in the groupedInterns object
                if (!groupedInterns[intern.year]) {
                    // If not, create an array for that year
                    groupedInterns[intern.year] = [];
                }
                // Push the current intern into the array for their year
                groupedInterns[intern.year].push(intern);
            });

            // console.log(groupedInterns);
            res.status(200).json({ groupedInterns });
        }
        catch (error) {
            res.status(404).json({ error: "error fetching the interns!" })
        }
    } else {
        res.status(200).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);