import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import { CREATE_REVIEW } from "../../graphql/mutations/createReview";
import CreateReviewForm from "./CreateReviewForm";

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: Number(values.rating),
      text: values.text || undefined,
    };

    try {
      const { data } = await mutate({
        variables: {
          review,
        },
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
