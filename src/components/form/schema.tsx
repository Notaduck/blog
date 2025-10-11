import * as yup from "yup";
import React, { useCallback} from "react";

export const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Must be a valid email").required("Required"),
  subject: yup.string().required("Required"),
  text: yup
    .string()
    .required("Required")
    .min(50, "Must be at least 50 characters"),
});

export const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce((allErrors, currentError) => {
            if (!allErrors[currentError.path]) {
              allErrors[currentError.path] = {
                type: currentError.type ?? "validation",
                message: currentError.message,
              };
            }
            return allErrors;
          }, {}),
        };
      }
    },
    [validationSchema]
  );
