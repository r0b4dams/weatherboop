import { Route, Routes } from "react-router-dom";

// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*", { import: "default", eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const match = path.match(/\.\/pages\/(.*)\.[t|j]sx$/);
  const name = match![1];
  return {
    name,
    path: name === "index" ? "/" : `/${name?.toLowerCase()}`,
    Page: module as React.ElementType,
  };
});

export const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ name, path, Page }) => (
        <Route key={name} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};

export default Router;
