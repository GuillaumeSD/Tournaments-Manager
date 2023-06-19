import { Autocomplete, TextField, styled } from "@mui/material";

const TextFieldWithoutArrows = styled(TextField)({
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

export type Props = {
  score: number;
  setScore: (score: number) => void;
  color: string;
};

export default function ScoreInput({ score, setScore, color }: Props) {
  return (
    <Autocomplete
      options={[...Array(100).keys()]}
      renderInput={(params) => (
        <TextFieldWithoutArrows
          {...params}
          type="number"
          inputProps={{
            ...params.inputProps,
            min: 0,
            max: 99,
            style: {
              textAlign: "center",
              padding: 0,
              color,
              cursor: "pointer",
              fontSize: 20,
              fontWeight: 500,
            },
          }}
        />
      )}
      getOptionLabel={(option) => option.toString()}
      filterOptions={(options, _) => options}
      inputValue={score.toString()}
      onInputChange={(_, value) => setScore(Number(value))}
      forcePopupIcon={false}
      disableClearable
      freeSolo
      selectOnFocus
      sx={{
        width: 70,
        margin: 1,
        "& .MuiInputBase-root": {
          padding: 1,
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    />
  );
}
