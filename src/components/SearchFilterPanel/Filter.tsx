import {FaTimesCircle} from "react-icons/fa";
import {FaFilter} from "react-icons/fa";
import "../css/SearchFilterPanel.css"
import {useState} from "react";
import {Box, Button, Card, Input} from "@mui/joy";
import {MultiSelectQualification} from "./MultiSelectQualification.tsx";

interface Props {
    setSelectedQualifications: (selected: string[]) => void;
    setSearchedCity: (selected: string) => void;
}

export function Filter({setSelectedQualifications, setSearchedCity: setSearchedCity}: Props) {
    const [showFilter, setShowFilter] = useState(false);
    const [filterSelected, setFilterSelected] = useState(false);
    const [tempCity, setTempCity] = useState<string>("");
    const [tempQualifications, setTempQualifications] = useState<string[]>([]);

    return (
        <div className={"filter-wrapper"}>
            <Button
                sx={{
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "12px",
                    backgroundColor: filterSelected ? "#1976d2" : "#e3e3e3",
                    color: filterSelected ? "white" : "black",
                    "&:hover": {backgroundColor: filterSelected ? "#1976d2" : "#e3e3e3"}
                }}
                onClick={() => setShowFilter(prev => !prev)}
            >
                <FaFilter/> Filter
            </Button>
            {showFilter && (
                <Card className="filter-widget">
                    <Input placeholder={"Ort..."} value={tempCity} onChange={(e) => {
                        setTempCity(e.target.value)
                    }}/>
                    <MultiSelectQualification tempQualifications={tempQualifications}
                                              setTempQualifications={setTempQualifications}/>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    > <Button sx={{
                        "&:hover": {backgroundColor: "#1976d2"},
                        width: "70%",
                    }}
                              onClick={() => {
                                  if (tempCity !== "" || tempQualifications.length > 0) {
                                      setSearchedCity(tempCity.trim())
                                      setSelectedQualifications(tempQualifications)
                                      setFilterSelected(true);
                                  }
                                  setShowFilter(false);
                              }}>
                        Übernehmen
                    </Button>
                        <Button sx={{
                            backgroundColor: "red",
                            "&:hover": {backgroundColor: "red"}
                        }}
                                onClick={() => {
                                    setTempCity("")
                                    setSearchedCity("")
                                    setTempQualifications([])
                                    setSelectedQualifications([])
                                    setShowFilter(false);
                                    setFilterSelected(false);
                                }}>
                            <FaTimesCircle/>
                        </Button>
                    </Box>
                </Card>
            )}
        </div>
    );
}