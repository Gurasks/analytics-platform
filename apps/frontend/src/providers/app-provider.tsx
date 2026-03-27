import { ThemeProvider } from "@/shared/theme";
import { ApolloProviderWrapper } from "./apollo-provider";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ApolloProviderWrapper>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProviderWrapper>
  );
}