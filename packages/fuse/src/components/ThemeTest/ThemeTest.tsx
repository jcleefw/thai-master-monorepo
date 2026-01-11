import type { ThemeTestProps } from './ThemeTest.types';
import {
  Container,
  Title,
  ColorGrid,
  ColorSwatch,
  ColorLabel,
  ThaiSample,
  ContrastInfo,
} from './ThemeTest.styles';
import { theme } from '../../theme';

export const ThemeTest = ({ showThaiSample = true }: ThemeTestProps) => {
  const colors = Object.entries(theme.colors);

  return (
    <Container>
      <Title>Theme Test Component</Title>

      <ColorGrid>
        {colors.map(([name, value]) => (
          <ColorSwatch key={name} color={value}>
            <ColorLabel>
              {name}: {value}
            </ColorLabel>
          </ColorSwatch>
        ))}
      </ColorGrid>

      {showThaiSample && (
        <>
          <ThaiSample>
            สวัสดี ครับ
            <br />
            ก ข ค ง จ ฉ ช
            <br />
            ก้า ก๊า ก่า ก๋า
          </ThaiSample>
          <ContrastInfo>
            Thai characters rendered with 7:1 contrast ratio (charcoal on cream).
            Font: Noto Sans Thai (primary) with Sarabun fallback.
          </ContrastInfo>
        </>
      )}
    </Container>
  );
};
