# Q4 Dependency Array Note

If the filtering effect has an empty dependency array, it runs only after the first render. When the user changes the selected category or when menu data changes, the effect will not run again. The visible filtered list can therefore remain stuck on the initial category/data. React's dependency array tells the effect which reactive values it reads and depends on. For this reason the filtering logic must depend on both the selected category and the current menu data (or, in the optimized Q8 version, be derived directly with `useMemo`).
