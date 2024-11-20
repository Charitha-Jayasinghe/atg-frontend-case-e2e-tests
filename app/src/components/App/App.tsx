import React, { Suspense, useState } from "react";
import { Container, SelectWrapper } from "./App.styles";
import { BetTypeResult } from "../BetTypeResult";
import { SelectBetType } from "../SelectBetType";
import { BetType, SortOrder } from "../../types";
import { SelectDisplayOrder } from "../SelectDisplayOrder";
import { LoadingIndicator } from "../LoadingIndicator";

type SelectableBetType = BetType | "";
type SelectableDisplayOrder = SortOrder | undefined;

export const App = () => {
  const [selectedBetType, setSelectedBetType] = useState<SelectableBetType>("");
  const [selectedDisplayOrder, setSelectedDisplayOrder] =
    useState<SelectableDisplayOrder>();

  return (
    <Container>
      <SelectWrapper>
        <SelectBetType onChange={setSelectedBetType} />
        <SelectDisplayOrder
          onChange={setSelectedDisplayOrder}
          value={selectedDisplayOrder}
        />
      </SelectWrapper>
      <Suspense fallback={<LoadingIndicator />}>
        {selectedBetType && (
          <BetTypeResult
            betType={selectedBetType}
            displayOrder={selectedDisplayOrder}
          />
        )}
      </Suspense>
    </Container>
  );
};
