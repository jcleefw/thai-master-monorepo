import styled from 'styled-components';

// Type assertions needed due to React 18/19 type compatibility issue in node_modules
export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.cream};
  border-radius: 8px;
` as any;

export const Title = styled.h2`
  color: ${props => props.theme.colors.charcoal};
  font-size: 24px;
  margin-bottom: ${props => props.theme.spacing.md};
  font-weight: 700;
` as any;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
` as any;

export const ColorSwatch = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  padding: ${props => props.theme.spacing.md};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.charcoal};
  min-height: 80px;
  display: flex;
  align-items: flex-end;
` as any;

export const ColorLabel = styled.span`
  color: ${props => props.theme.colors.charcoal};
  font-size: 14px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
` as any;

export const ThaiSample = styled.p`
  font-size: 48px;
  color: ${props => props.theme.colors.charcoal};
  margin-top: ${props => props.theme.spacing.lg};
  line-height: ${props => props.theme.typography.lineHeight};
  font-family: ${props => props.theme.typography.fontFamily.primary};
` as any;

export const ContrastInfo = styled.p`
  color: ${props => props.theme.colors.charcoal};
  font-size: 14px;
  margin-top: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.lavender};
  padding: ${props => props.theme.spacing.sm};
  border-radius: 4px;
` as any;
