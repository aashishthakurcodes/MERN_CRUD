import crudSchema from "../Modals/crudSchema.js";

export const createData = async (req, res) => {
  try {
    const { title, desc, date, time, selectedDirectory } = req.body;
    const formattedDate = new Date(date);

    if (!title) {
      return res.status(400).send({ success: false, message: "Title is required" });
    }
    if (!desc) {
      return res.status(400).send({ success: false, message: "Description is also required" });
    }
    if (!formattedDate || isNaN(formattedDate.getTime())) {
      return res.status(400).send({ success: false, message: "Invalid date format" });
    }
    if (!time) {
      return res.status(400).send({ success: false, message: "Time is required" });
    }
    if (!selectedDirectory) {
      return res.status(400).send({ success: false, message: "Please choose your Directory" });
    }

    const user = await new crudSchema({
      title,
      desc,
      date: formattedDate,
      time,
      selectedDirectory
    }).save();

    // Sending Confirmation with user object
    res.status(201).send({
      success: true,
      message: "Task Added Successfully",
      user: {
        title: user.title,
        desc: user.desc,
        date: user.date,
        time: user.time,
        selectedDirectory: user.selectedDirectory,
      },
    });
  } catch (error) {
    console.error(error);
    console.log("Error in creating Task");
    res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
  }
};
