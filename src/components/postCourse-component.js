import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course_service";

const PostCourseComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [courseData, setCourseData] = useState(null);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");

  //Event Handler
  const TakeToLoginHandler = () => {
    navigate("/login");
  };
  const TitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const DesciptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const PriceHandler = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert("New course has been created.");
        navigate("/course"); //顯示現有的課程
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  // useEffect(() => {
  //   console.log("using effect");
  //   console.log(currentUser);
  //   let _id = currentUser.user._id;
  //   console.log(currentUser.user.role);
  //   if (currentUser.user.role == "instructor") {
  //     CourseService.get(_id)
  //       .then((data) => {
  //         console.log(data.data);
  //         setCourseData(data.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else if (currentUser.user.role == "student") {
  //     CourseService.getEnrolled(_id)
  //       .then((data) => {
  //         console.log(data.data);
  //         setCourseData(data.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before posting a new course.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={TakeToLoginHandler}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>Only instrcutors can post new courses.</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label for="exampleforTitle">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={TitleHandler}
          />
          <br />
          <label for="exampleforContent">Content</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={DesciptionHandler}
          />
          <br />
          <label for="exampleforPrice">Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={PriceHandler}
          />
          <br />
          <button onClick={postCourse} className="btn btn-primary">
            Submit
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
