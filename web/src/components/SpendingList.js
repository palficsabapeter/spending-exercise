import React, { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

export default function SpendingList({ spendings, setSpendings, currencyFilter, ordering }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function filterByCurrency(list) {
    let result = [];
    if (currencyFilter !== '') {
      for (const spending of list) {
        if (spending.currency === currencyFilter)
          result.push(spending);
      }
      return result;
    } else {
      return list;
    }
  }

  function orderByDate(list) {
    return list.sort((a, b) => new Date(a.spent_at) - new Date(b.spent_at));
  }

  function orderByAmount(list) {
    return list.sort((a, b) => {
      if (a.currency !== b.currency) {
        if (a.currency === 'USD') {
          return a.amount * 365 - b.amount;
        } else {
          return a.amount - b.amount * 365;
        }
      } else {
        return a.amount - b.amount;
      }
    });
  }

  function order(list) {
    switch(ordering) {
      case '-date':
        return orderByDate(list).reverse();
      case 'date':
        return orderByDate(list);
      case '-amount_in_huf':
        return orderByAmount(list).reverse();
      case 'amount_in_huf':
        return orderByAmount(list);
      default:
        return orderByDate(list).reverse();
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/spendings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          No spendings!
        </h1>
      )}
      {spendings.length > 0 &&
        order(filterByCurrency(spendings)).map((spending) => (
          <Spending key={spending.id}>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {(spending.amount / 100).toFixed(2)}
              </Amount>
            </AmountWrapper>
          </Spending>
        ))}
    </>
  );
}
