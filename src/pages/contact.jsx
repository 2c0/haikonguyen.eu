// libs
import React, { useContext } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { Form, Field } from "react-final-form";
import * as Yup from "yup";

// components
import { TextField, makeValidate } from "mui-rff";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import config from "../../data/SiteConfig";
import Layout from "../components/layout/layout.component";
import Hero from "../components/hero/hero.component";
import CustomizedDialogs from "../components/materialui/dialog.component";

// others
import { UiContext } from "../context/ui.context";
import StyledForm from "./contact.style";
import CustomBtn from "../components/materialui/button.component";

const encode = data => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
};

const ContactPage = props => {
  const { data } = props;
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const {
    allMarkdownRemark: { edges }
  } = data;

  const {
    node: {
      frontmatter: { aboutHero }
    }
  } = edges[0];

  const uiContext = useContext(UiContext);
  const { isHome } = uiContext;

  const { t } = useTranslation("CONTACT");

  const submitHandler = values => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values
      })
    })
      .then(handleModalOpen)
      // eslint-disable-next-line no-alert
      .catch(error => alert(error));
  };

  // We define our schema based on the same keys as our form:
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    message: Yup.string()
      .min(50)
      .required()
  });

  // Run the makeValidate function...
  const validate = makeValidate(schema);

  return (
    <Layout>
      <div className="contact-container">
        <Helmet title={`Contact | ${config.siteTitle}`} />
        <Hero isHome={isHome} fluid={aboutHero.childImageSharp.fluid}>
          {/* TODO: REFACTOR, use better template */}
          <h1>{t("HEADING")}</h1>
        </Hero>
        <StyledForm className="container--fixed mt5-l mt4 mb5-l mb4">
          <Paper className="flex justify-center" elevation={3}>
            <Form onSubmit={submitHandler} validate={validate}>
              {({ handleSubmit }) => {
                return (
                  <form
                    className="w-100 formWrapper pt2 pb2 pt5-l pb5-l"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    action="/"
                    name="contact"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <TextField
                      required
                      label="Name:"
                      className="contactInput"
                      name="name"
                    />
                    <TextField
                      required
                      id="standard-required"
                      label="Email:"
                      className="contactInput"
                      name="email"
                    />
                    <div className="contactInput textAreaWrapper flex items-center flex-column">
                      <Field name="message">
                        {({ input, meta: { error, touched } }) => {
                          const isError = error && touched;

                          return (
                            <>
                              <div
                                className={
                                  isError
                                    ? "w-100 text-left mb2 error"
                                    : "w-100 text-left mb2 mt3"
                                }
                              >
                                {isError ? error : "Message: *"}
                              </div>
                              <textarea
                                className={isError ? "errorTextarea" : null}
                                {...input}
                              />
                            </>
                          );
                        }}
                      </Field>
                    </div>
                    <div className="w-100 flex justify-end">
                      <CustomBtn
                        text="Send"
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                      />
                    </div>
                  </form>
                );
              }}
            </Form>
          </Paper>
          <CustomizedDialogs open={open} handleModalClose={handleModalClose} />
        </StyledForm>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Contact {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "about" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            aboutHero {
              childImageSharp {
                fluid(maxWidth: 2600, maxHeight: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          html
        }
      }
    }
  }
`;

export default ContactPage;
