/** *
 * All utility Functions
 */
import { Typography } from "@material-ui/core";
import moment from "moment";
import qs from "qs";
import React from "react";

export function makeDeleteUI({ idsToDelete, templates }) {
  const len = (idsToDelete && idsToDelete.length) || 0;
  var text = `Are you sure you want to delete (
    ${(idsToDelete && idsToDelete.length) || ""})
    ${len === 1 ? " event? " : " events? "}`;

  if (templates && templates.length)
    text = `Sorry, (${templates.length}) template${
      templates.length === 1 ? "" : "s"
    } selected. You can't delete templates. `;
  return <Typography>{text}</Typography>;
}

export const objArrayToString = (data, func) => {
  var s = "";
  (data || []).forEach((d, index) => {
    if (!s) s += func(d);
    else s += ", " + func(d);
  });
  return s;
};
export const makeLimitsFromImageArray = (images) => {
  if (images.length === 1)
    return {
      lower_limit: images[0].id,
      upper_limit: images[0].id,
      images,
    };
  images = images.sort((a, b) => (a.id > b.id ? 1 : -1));
  return {
    lower_limit: images[0].id || 0,
    upper_limit: images[images.length - 1].id || 0,
    images: images || [],
  };
};
export const getHumanFriendlyDate = (
  dateString,
  includeTime = false,
  forSorting = true
) => {
  if (!dateString) return null;
  var format = "";
  if (forSorting) format = `YYYY-MM-DD ${includeTime ? "hh:mm a" : ""}`;
  else format = `MMMM Do, YYYY ${includeTime ? "hh:mm a" : ""}`;
  return moment(dateString).format(
    // make it a bit less human friendly, so it sorts properly
    format
  );
};
export const makeTimeAgo = (dateString) => {
  if (!dateString) return "";

  return moment(dateString).fromNow();
};
export const smartString = (string, charLimit = 60) => {
  if (!string) return "";
  if (!charLimit) return string;
  if (string.length > charLimit) return string.substr(0, charLimit) + "...";
  return string;
};
/**
 * The function retrieves a particular value from an array , and returns it with the remaining items of the array
 * @param {*} arr
 * @param {*} value
 * @param {*} finder  A function that should be used to extract the content to be compared to the "value" parameter  (In case an array of object is passed instead of strings)
 * @returns
 */
export const pop = (arr = [], value, finder) => {
  if (!arr) return [];
  const rest = [];
  var found = null;
  arr.forEach((item) => {
    const val = finder ? finder(item) : item;
    if (val === value) found = item;
    else rest.push(item);
  });

  return [found, rest];
};

export const findMatchesAndRest = (arr = [], finder) => {
  if (!arr) return [];
  const rest = [];
  const found = [];
  arr.forEach((item) => {
    if (finder(item)) found.push(item);
    else rest.push(item);
  });

  return [found, rest];
};
export function notNull(d) {
  try {
    return d && d !== "null" && d.trim() !== "";
  } catch (ex) {
    return false;
  }
}

export function isEmpty(val) {
  return !val || ["null", "undefined", ""].indexOf(`${val}`.toLowerCase()) > -1;
}

export function isNotEmpty(val) {
  return !isEmpty(val);
}

export function getAddress(d) {
  if (
    !d ||
    (notNull(d.address) &&
      notNull(d.unit) &&
      notNull(d.city) &&
      notNull(d.state) &&
      notNull(d.zipcode) &&
      notNull(d.country))
  )
    return "No Address Provided";
  return `${notNull(d.address) ? d.address + ", " : ""}${
    notNull(d.unit) ? d.unit + ", " : ""
  }${notNull(d.city) ? d.city + ", " : ""}${
    notNull(d.state) ? d.state + ", " : ""
  }${notNull(d.zipcode) ? d.zipcode + ", " : ""}${
    notNull(d.country) ? d.country : ""
  }`;
}

export function convertBoolean(b) {
  return `${b === true || b === "true" ? "Yes" : "No"}`;
}

export function goHere(link, history) {
  if (history) return history.push(link);
  window.location = link;
}

// TODO: be aware of filter choices
export const updateFilterChoices = () => {
  return null;
};

export const getUrlParamsForFilterInputs = (filterChoices) => {
  if (!filterChoices) return "";
  return "";
};

export const getFilterInputsFromURL = (location) => {
  if (!location || !location.search) return "";
  const { filterInputs } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return filterInputs;
};

export const ourCustomSort = ({ a, b, colIndex, order, compare }) => {
  const directionConstant = order === "desc" ? 1 : -1;
  a = a.data[colIndex];
  b = b.data[colIndex];
  if (compare) return compare({ a, b }) * directionConstant;
  return (a < b ? -1 : 1) * directionConstant;
};

export const getTimeStamp = () => {
  const today = new Date();
  let newDate = today;
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return Intl.DateTimeFormat("en-US", options).format(newDate);
};
/**
 *
 * @param {*} location : Props Location
 * @param {*} paramName
 * @returns
 */
export const fetchParamsFromURL = (location, paramName, names) => {
  if (!location || !location.search) return "";
  const obj = qs.parse(location.search, { ignoreQueryPrefix: true });
  const value = (obj[paramName] || "").toString();
  delete obj[paramName];
  const params = {};
  if (names && names.length) {
    names.forEach((n) => {
      params[n] = obj[n];
      delete obj[n];
    });
  }
  return (
    {
      params,
      [paramName]: value,
      rest: { object: obj, qs: qs.stringify(obj) || "" },
    } || {}
  );
};
