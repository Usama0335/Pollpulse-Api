import * as yup from "yup";

const schema = yup.object().shape({
    question: yup.string().required("Question is required"),
    answer1: yup.string().required("Answer 1 is required"),
    answer2: yup.string().required("Answer 2 is required"),
});

export default schema;
