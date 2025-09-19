import { useSetRecoilState } from "recoil";
import useAuth from "../context/userContext";
import { getApi, getToken } from "../service/axios.service";
import { userCoursesAtom } from "../recoil/atom/userCourseAtom";

export const useFetchUser = () => {
  const { signIn } = useAuth();
  const setUserCourses = useSetRecoilState(userCoursesAtom);
  const getUser = async (id) => {
    const token = getToken();

    try {
      const response = await Promise.all([
        getApi(`auth/user?id=${id}`),
        // getApi(`userCourse?userId=${id}`),
      ]);
      const userData = response[0];
      // const courseData = response[1];
      if (userData?.status === 200 || userData?.data?.statusCode === 200) {
        signIn({ ...userData?.data, token });
      }
      // if (courseData?.data?.statusCode === 200) {
      //   setUserCourses(courseData.data?.data);
      // }
    } catch (err) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return getUser;
};
