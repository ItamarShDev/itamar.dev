import css from "styled-jsx/css";
export const Blog = css`
   .title a {
      color: #0070f3;
      text-decoration: none;
   }

   .title a:hover,
   .title a:focus,
   .title a:active {
      text-decoration: underline;
   }

   .title {
      margin: 0;
      line-height: 1.15;
      font-size: 4rem;
   }

   .title,
   .description {
      text-align: center;
   }

   .description {
      line-height: 1.5;
      font-size: 1.5rem;
   }

   code {
      background: #fafafa;
      border-radius: 5px;
      padding: 0.75rem;
      font-size: 1.1rem;
      font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
         DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
   }
`;