import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHref, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as CloseIcon } from "assets/svgs/close.svg";

export default function useSearchFormParam(props) {
  const paramName = props?.paramName || "nameText";
  const href = useHref();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, setValue } = useForm({
    txt: params.get(paramName) || "",
  });

  const updateParams = (name, value) => {
    params.set(name, value);
    const paramsStr = params?.size > 0 ? `?${params.toString()}` : "";
    navigate(`${href}${paramsStr}`, {
      replace: true,
    });
  };

  const removeParams = (name) => {
    params.delete(name);
    const paramsStr = params?.size > 0 ? `?${params.toString()}` : "";
    navigate(`${href}${paramsStr}`, {
      replace: true,
    });
  };

  useEffect(() => {
    if (!window.location.href?.includes(paramName)) {
      setValue("txt", "");
    } else {
      if (params.get(paramName)?.length <= 0) {
        setValue("txt", "");
        return removeParams(paramName);
      }
      setValue("txt", params.get(paramName) || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, params, setValue]);

  const onSubmit = (data) => {
    updateParams(paramName, data.txt);
  };
  const EmptyButton = useCallback(
    () =>
      !!getValues("txt") && (
        <button
          type="button"
          onClick={() => removeParams(paramName)}
          style={{ translate: "120%" }}
        >
          <CloseIcon fill="white" />
        </button>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params]
  );

  return [register, handleSubmit(onSubmit), params, EmptyButton];
}
