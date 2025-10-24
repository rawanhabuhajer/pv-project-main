import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import GuestRoute from "helpers/authentication/guestRoute";
import AuthRoute from "helpers/authentication/authRoute";

import Layout from "./components/Layout/Layout";
import Dashboard from "views/dashboard/Index";
import NotFound from "views/NotFound";
import Login from "views/login";
import ForgetPassword from "views/forget-password";
import Logout from "views/Logout";
import { getAllContentSections, getCurrentUser } from "store/actions";
import Loader from "./components/shared/Loader";

//Home Sections
import HeroIndex from "views/home/heroSection/Index";
import FeaturesIndex from "views/home/features/Index";
import UseCasesIndex from "views/home/useCases/Index";
import ResultsIndex from "views/home/results/Index";
import TestimonialIndex from "views/home/testimonials/Index";
import GuideIndex from "views/home/guide/Index";
import PartnersIndex from "views/home/partners/Index";
import LoginIndex from "views/home/login/Index";
import RegisterIndex from "views/home/register/Index";
import ForgetPasswordIndex from "views/home/forgetPassword/Index";
import ResetPasswordIndex from "views/home/resetPassword/Index";

import RequestDemoIndex from "views/home/requestDemo/Index";
import InstructionsIndex from "views/home/instructions/Index";
import AboutIndex from "views/home/about/Index";
import AboutFeaturesIndex from "views/home/aboutFeatures/Index";
import BlogsContentIndex from "views/home/blogs/Index";
import AboutStatistics from "views/home/aboutStatistics/Index";
import WaitingListIndex from "views/home/waitingList/Index";
import StepsContentIndex from "views/home/steps/Index";
import ThankYouIndex from "views/home/thank-you/Index";
import WaitingListThankYouIndex from "views/home/waiting-list-thank-you/Index";
import FrequentlyAskedQuestionsIndex from "views/home/FrequentlyAskedQuestions/Index";
import CompetitiveAdvantage from "views/home/competitiveAdvantage/Index";
import WorkflowManager from "views/home/workflowManager/Index";
import LetsWin from "views/home/letsWin/Index";
import AboutHero from "views/home/aboutHero/Index";

import Privacy from "views/privacy/Index";

//settings
import Settings from "views/settings/Index";

//admins
import Admins from "views/admins/Index";
import AddAdmin from "views/admins/AddAdmin";
import EditAdmin from "views/admins/EditAdmin";

//blogs
import Blogs from "views/blogs/Index";
import AddBlog from "views/blogs/AddBlog";
import EditBlog from "views/blogs/EditBlog";

// users
import Users from "views/users/Index";
import EditUser from "views/users/Edit";

//terms
import Terms from "views/terms/Index";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  //selectors
  const { isLoggedIn } = useSelector((state) => state?.authentication);

  useEffect(() => {
    if (token) dispatch(getCurrentUser());
    dispatch(getAllContentSections());
  }, [token, dispatch]);

  const RenderApp = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Users />
                  </AuthRoute>
                }
              />

              {/*Home Sections */}
              <Route path="/home/hero" element={<HeroIndex />} />
              <Route path="/home/partners" element={<PartnersIndex />} />
              <Route path="/home/features" element={<FeaturesIndex />} />
              <Route path="/home/use-cases" element={<UseCasesIndex />} />
              <Route path="/home/results" element={<ResultsIndex />} />
              <Route path="/home/testimonials" element={<TestimonialIndex />} />
              <Route path="/home/guide" element={<GuideIndex />} />
              <Route path="/home/login" element={<LoginIndex />} />
              <Route path="/home/register" element={<RegisterIndex />} />
              <Route
                path="/home/forget-password"
                element={<ForgetPasswordIndex />}
              />
              <Route
                path="/home/reset-password"
                element={<ResetPasswordIndex />}
              />

              <Route path="/home/request-demo" element={<RequestDemoIndex />} />
              <Route
                path="/home/instructions"
                element={<InstructionsIndex />}
              />
              <Route path="/home/about" element={<AboutIndex />} />
              <Route
                path="/home/about-features"
                element={<AboutFeaturesIndex />}
              />
              <Route
                path="/home/FrequentlyAskedQuestions"
                element={<FrequentlyAskedQuestionsIndex />}
              />
            
              <Route
                path="/home/about-statistics"
                element={<AboutStatistics />}
              />
              <Route
                path="/home/competitive-advantage"
                element={<CompetitiveAdvantage />}
              />
              <Route path="/home/lets-win" element={<LetsWin />} />
              <Route path="/home/about-hero" element={<AboutHero />} />
              {/* <Route
                path="/home/about-title"
                element={<CompetitiveAdvantage />}
              /> */}
             
              <Route path="/home/blogs" element={<BlogsContentIndex />} />
              <Route path="/home/waiting-list" element={<WaitingListIndex />} />
              <Route path="/home/steps" element={<StepsContentIndex />} />
              <Route path="/home/thank-you" element={<ThankYouIndex />} />
              <Route
                path="/home/waiting-list-thank-you"
                element={<WaitingListThankYouIndex />}
              />

              {/*privacy */}
              <Route path="/privacy" element={<Privacy />} />

              {/* terms */}
              <Route path="/terms-and-conditions" element={<Terms />} />

              {/* settings */}
              <Route path="/settings" element={<Settings />} />

              {/*admins */}
              <Route path="/admins" element={<Admins />} />
              <Route path="/admins/add" element={<AddAdmin />} />
              <Route path="/admins/:id" element={<EditAdmin />} />

              {/*blogs */}
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/blogs/:id" element={<EditBlog />} />

              {/*users */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<EditUser />} />

              <Route path="*" element={<NotFound />} />
            </Route>

            {/*Auth Routes */}
            <Route
              path="/logout"
              element={
                <AuthRoute>
                  <Logout />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/forget-password"
              element={
                <GuestRoute>
                  <ForgetPassword />
                </GuestRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    );
  };

  if (!token) return RenderApp();
  if (isLoggedIn !== null) return RenderApp();
  return <Loader />;
};

export default App;
