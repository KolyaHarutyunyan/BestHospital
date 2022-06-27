function App() {
   window.onbeforeunload = function () {
      window.scrollTo(0, 0);
   };
   return (
      <div className="App">
         toast-container <br />
         top-bar <br />
         routers <br />
         footer
      </div>
   );
}

export default App;
