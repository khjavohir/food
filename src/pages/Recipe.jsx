import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY} `
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <DetailWrapper>
      <div>
        <h2 style={{}}>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div style={{ width: "650px" }}>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
            <ul style={{ width: "650px" }}>
              {details.extendedIngredients.map(ingred => (
                <li key={ingred.id}>{ingred.original}</li>
              ))}
            </ul>
          </div>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  margin-left: 50px;
  .active {
    background: linear-gradient(35deg, #494949, #313131);

    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

export default Recipe;
