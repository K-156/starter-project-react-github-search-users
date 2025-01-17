import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (total[language]) {
      total[language] = {
        label: language,
        value: total[language].value + 1,
        star: total[language].star + stargazers_count,
      };
    } else {
      total[language] = { label: language, value: 1, star: stargazers_count };
    }
    return total;
  }, {});

  // Sorting the array from largest to smallest
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.star - a.star;
    })
    .slice(0, 5);

  // stars and forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, forks_count, name } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks_count] = { label: name, value: forks_count };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={stars} />
        <Column3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
