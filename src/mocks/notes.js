/**
 * Mock notes for frontend-only prototype. High-fidelity markdown for UI testing.
 */

export const MOCK_NOTES = [
  {
    id: "1",
    title: "Cell Membrane Biology",
    date: "2 hrs ago",
    tag: "Biology 101",
    content: `# Structure
The **phospholipid bilayer** is semi-permeable.

## Components
1. Proteins
2. Cholesterol
3. Carbohydrates

## Key Concepts
### Phospholipid Bilayer
- **Hydrophilic heads** face outward toward water.
- **Hydrophobic tails** face inward away from water.

## Key Takeaways
- Membrane structure determines what can enter/leave the cell.
- Proteins enable transport and signaling.`,
    confidenceScore: 0.98,
  },
  {
    id: "2",
    title: "Diffusion and Osmosis",
    date: "Yesterday",
    tag: "Biology 101",
    content: `# Transport Across Membranes

## Definitions
- **Diffusion**: movement from high concentration to low concentration.
- **Osmosis**: diffusion of water across a membrane.

## Types
1. **Passive transport**: no energy required
   - diffusion
   - osmosis
   - facilitated diffusion
2. **Active transport**: requires energy (ATP)
   - protein pumps
   - endocytosis/exocytosis

## Key Takeaways
- Passive transport follows concentration gradients.
- Active transport moves against gradients using ATP.`,
    confidenceScore: 0.95,
  },
  {
    id: "3",
    title: "Newton's Laws",
    date: "3 days ago",
    tag: "Physics 101",
    content: `# Newton's Laws of Motion

## First Law
An object remains at rest or in uniform motion unless acted upon by a force.

## Second Law
\\( F = ma \\) — Force equals mass times acceleration.

## Third Law
For every action there is an equal and opposite reaction.

## Key Takeaways
- Inertia is resistance to change in motion.
- Forces cause acceleration.
- Action-reaction pairs act on different bodies.`,
    confidenceScore: 0.99,
  },
  {
    id: "4",
    title: "Organic Chemistry Basics",
    date: "1 week ago",
    tag: "Chem 201",
    content: `# Carbon and Hydrocarbons

## Overview
- Carbon forms four covalent bonds.
- **Alkanes**: single bonds only (e.g. methane, ethane).
- **Alkenes**: at least one double bond.
- **Alkynes**: at least one triple bond.

## Naming
1. Find longest carbon chain.
2. Number from end nearest substituent.
3. Name substituents with prefixes (methyl-, ethyl-).

## Key Takeaways
- Structure determines reactivity.
- Functional groups define organic families.`,
    confidenceScore: 0.92,
  },
  {
    id: "5",
    title: "Calculus: Derivatives",
    date: "2 weeks ago",
    tag: "Math 101",
    content: `# Derivative Rules

## Definition
The derivative \\( f'(x) \\) is the limit of the difference quotient.

## Rules
- **Power rule**: \\( \\frac{d}{dx} x^n = n x^{n-1} \\)
- **Sum rule**: \\( (f + g)' = f' + g' \\)
- **Product rule**: \\( (fg)' = f'g + fg' \\)

## Key Takeaways
- Derivatives represent instantaneous rate of change.
- Chain rule applies to compositions.`,
    confidenceScore: 0.97,
  },
  // Note with warning term for editor tooltip demo
  {
    id: "6",
    title: "Sample with uncertain read",
    date: "1 hr ago",
    tag: "Demo",
    content: `# Sample Note

## Overview
This section contains a low-confidence read: the word [illegible] was detected by OCR and may be incorrect.

## Key Takeaways
- Use the warning tooltip to see confidence notes.
- [illegible] appears when the system is uncertain.`,
    confidenceScore: 0.85,
  },
];
