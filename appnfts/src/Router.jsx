
import Collection1 from "./Pages/CollectionsNftPages/Collection1";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageCollection2 from "./Pages/CollectionsNftPages/PageCollection2";
import PageCollection3 from "./Pages/CollectionsNftPages/PageCollection3";
import PageCollection4 from "./Pages/CollectionsNftPages/PageCollection4";
import PageCollection5 from "./Pages/CollectionsNftPages/PageCollection5";
import PageCollection1 from "./Pages/CollectionsNftPages/Collection1";
import HomePage from "./Pages/HomePage/HomePage";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/collection1" element={<PageCollection1/>} />
                <Route path="/collection2" element={<PageCollection2/>} />
                <Route path="/collection3" element={<PageCollection3/>} />
                <Route path="/collection4" element={<PageCollection4/>} />
                <Route path="/collection5" element={<PageCollection5/>} />
                {/*<Route path="/:id" element={<AccomadationPage/>}/>*/}

                {/*<Route path="*" element={<ErrorPage/>}/>*/}
            </Routes>

        </BrowserRouter>
    )

}

export default Router