import styled from 'styled-components';
import { rem } from 'polished';

const StyledMain = styled.main`
  .sections {
    padding: ${rem('70px')} ${rem('15px')};

    .heading {
      padding-bottom: ${rem('70px')};

      h1 {
        color: ${(props) => props.theme.colors.white};
        text-align: center;
        margin: 0;
        text-transform: uppercase;
      }

      hr {
        border: ${rem('1px')} solid
          ${(props) => props.theme.colors.primaryThemeColor};
        width: ${rem('100px')};
        margin: 0 auto;
        margin-top: ${rem('10px')};
      }
    }
  }

  .homeHero {
    &__profileWrap {
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &__header {
        img {
          border-radius: 50%;
          height: ${rem('180px')};
          width: ${rem('180px')};
          border: ${rem('3px')} solid
            ${(props) => props.theme.colors.backgroundColor};
        }
      }

      &__description {
        color: white;
        text-align: center;
        h1 {
          margin: ${rem('10px')} 0;
        }
      }
    }
  }

  .about {
    display: grid;
    grid-gap: ${rem('50px')};
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: flex-start;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: ${rem('10px')};
    }

    @media ${(props) => props.theme.screen.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default StyledMain;
