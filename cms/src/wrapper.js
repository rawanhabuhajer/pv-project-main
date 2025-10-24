import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Arabic from "./lang/ar.json";

const Wrapper = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [locale, setLocale] = useState("ar");
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState(Arabic);

  return (
    // selectLanguage
    <Context.Provider value={{ locale }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export const Context = React.createContext();
export default Wrapper;
