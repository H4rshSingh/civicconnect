import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    issuesHavetoResolve: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }],
}, { timestamps: true });

const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);
export default Department;