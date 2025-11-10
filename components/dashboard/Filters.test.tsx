import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filters from './Filters';

// Mock the UI components
jest.mock('@/components/ui/Select', () => ({
  Select: ({ value, onChange, options, placeholder }: any) => (
    <select
      data-testid="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
    >
      <option value="">{placeholder}</option>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock('@/components/ui/Card', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: any) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: any) => <h2>{children}</h2>,
  CardContent: ({ children }: any) => <div data-testid="card-content">{children}</div>,
}));

describe('Filters Component', () => {
  let mockOnFiltersChange: jest.Mock;

  beforeEach(() => {
    mockOnFiltersChange = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the filter card with title', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      expect(screen.getByText('Filter Results')).toBeInTheDocument();
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('should render all 9 filter dropdowns', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByTestId('select');
      expect(selects).toHaveLength(9);
    });

    it('should render filter labels correctly', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      expect(screen.getByText('Major')).toBeInTheDocument();
      expect(screen.getByText('Degree')).toBeInTheDocument();
      expect(screen.getByText('School Tier')).toBeInTheDocument();
      expect(screen.getByText('Internships')).toBeInTheDocument();
      expect(screen.getByText('Return Offer')).toBeInTheDocument();
      expect(screen.getByText('Sponsorship')).toBeInTheDocument();
      expect(screen.getByText('Graduating Time')).toBeInTheDocument();
      expect(screen.getByText('GPA Range')).toBeInTheDocument();
      expect(screen.getByText('When Started Applying')).toBeInTheDocument();
    });
  });

  describe('Filter Interactions', () => {
    it('should call onFiltersChange when major filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const majorSelect = screen.getByLabelText('All Majors');
      await user.selectOptions(majorSelect, 'Computer Science');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        major: 'Computer Science',
      });
    });

    it('should call onFiltersChange when degree filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const degreeSelect = screen.getByLabelText('All Degrees');
      await user.selectOptions(degreeSelect, "Bachelor's degree");

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        degree: "Bachelor's degree",
      });
    });

    it('should call onFiltersChange when school tier filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const schoolTierSelect = screen.getByLabelText('All Schools');
      await user.selectOptions(schoolTierSelect, 'Top 10 CS (MIT, Stanford, CMU, Berkeley, etc.)');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        school_tier: 'Top 10 CS (MIT, Stanford, CMU, Berkeley, etc.)',
      });
    });

    it('should call onFiltersChange when internship count filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByLabelText('All');
      const internshipSelect = selects[0]; // First "All" is internships
      await user.selectOptions(internshipSelect, '2');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        internship_count: '2',
      });
    });

    it('should call onFiltersChange when return offer filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByLabelText('All');
      const returnOfferSelect = selects[1]; // Second "All" is return offer
      await user.selectOptions(returnOfferSelect, "Yes, but I'm still searching for other opportunities");

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        has_return_offer: "Yes, but I'm still searching for other opportunities",
      });
    });

    it('should call onFiltersChange when sponsorship filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByLabelText('All');
      const sponsorshipSelect = selects[2]; // Third "All" is sponsorship
      await user.selectOptions(sponsorshipSelect, 'Yes, I need sponsorship');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        needs_sponsorship: 'Yes, I need sponsorship',
      });
    });

    it('should call onFiltersChange when GPA range filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const gpaSelect = screen.getByLabelText('All GPAs');
      await user.selectOptions(gpaSelect, '3.85 - 4.0');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        gpa_range: '3.85 - 4.0',
      });
    });
  });

  describe('Multiple Filters', () => {
    it('should accumulate multiple filter selections', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      // Select major
      const majorSelect = screen.getByLabelText('All Majors');
      await user.selectOptions(majorSelect, 'Computer Science');

      // Select degree
      const degreeSelect = screen.getByLabelText('All Degrees');
      await user.selectOptions(degreeSelect, "Bachelor's degree");

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(2);
      expect(mockOnFiltersChange).toHaveBeenNthCalledWith(1, {
        major: 'Computer Science',
      });
      expect(mockOnFiltersChange).toHaveBeenNthCalledWith(2, {
        major: 'Computer Science',
        degree: "Bachelor's degree",
      });
    });

    it('should handle clearing a filter by selecting empty value', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      // Select major
      const majorSelect = screen.getByLabelText('All Majors');
      await user.selectOptions(majorSelect, 'Computer Science');

      // Clear major
      await user.selectOptions(majorSelect, '');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(2);
      expect(mockOnFiltersChange).toHaveBeenNthCalledWith(1, {
        major: 'Computer Science',
      });
      expect(mockOnFiltersChange).toHaveBeenNthCalledWith(2, {
        major: undefined,
      });
    });

    it('should maintain other filters when one is cleared', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      // Select major and degree
      const majorSelect = screen.getByLabelText('All Majors');
      await user.selectOptions(majorSelect, 'Computer Science');

      const degreeSelect = screen.getByLabelText('All Degrees');
      await user.selectOptions(degreeSelect, "Bachelor's degree");

      // Clear major but keep degree
      await user.selectOptions(majorSelect, '');

      expect(mockOnFiltersChange).toHaveBeenLastCalledWith({
        major: undefined,
        degree: "Bachelor's degree",
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid filter changes', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const majorSelect = screen.getByLabelText('All Majors');

      // Rapidly change selections
      await user.selectOptions(majorSelect, 'Computer Science');
      await user.selectOptions(majorSelect, 'Data Science');
      await user.selectOptions(majorSelect, 'Software Engineering');

      expect(mockOnFiltersChange).toHaveBeenCalledTimes(3);
      expect(mockOnFiltersChange).toHaveBeenLastCalledWith({
        major: 'Software Engineering',
      });
    });

    it('should initialize with empty filters', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      // Check that no filters are called on initial render
      expect(mockOnFiltersChange).not.toHaveBeenCalled();
    });

    it('should handle all filters being set simultaneously', async () => {
      const user = userEvent.setup();
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = {
        major: screen.getByLabelText('All Majors'),
        degree: screen.getByLabelText('All Degrees'),
        schoolTier: screen.getByLabelText('All Schools'),
        gpa: screen.getByLabelText('All GPAs'),
      };

      await user.selectOptions(selects.major, 'Computer Science');
      await user.selectOptions(selects.degree, "Bachelor's degree");
      await user.selectOptions(selects.schoolTier, 'Top 10 CS (MIT, Stanford, CMU, Berkeley, etc.)');
      await user.selectOptions(selects.gpa, '3.85 - 4.0');

      expect(mockOnFiltersChange).toHaveBeenLastCalledWith({
        major: 'Computer Science',
        degree: "Bachelor's degree",
        school_tier: 'Top 10 CS (MIT, Stanford, CMU, Berkeley, etc.)',
        gpa_range: '3.85 - 4.0',
      });
    });
  });

  describe('Filter Options Validation', () => {
    it('should render correct major options', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const majorSelect = screen.getByLabelText('All Majors');
      const options = Array.from(majorSelect.querySelectorAll('option')).map(opt => opt.textContent);

      expect(options).toContain('Computer Science');
      expect(options).toContain('Software Engineering');
      expect(options).toContain('Data Science');
      expect(options).toContain('Information Systems');
      expect(options).toContain('Computer Engineering');
      expect(options).toContain('Other');
    });

    it('should render correct degree options', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const degreeSelect = screen.getByLabelText('All Degrees');
      const options = Array.from(degreeSelect.querySelectorAll('option')).map(opt => opt.textContent);

      expect(options).toContain("Bachelor's");
      expect(options).toContain("Master's (straight)");
      expect(options).toContain("Master's (worked)");
      expect(options).toContain('PhD');
      expect(options).toContain('Bootcamp');
      expect(options).toContain('Self-taught');
    });

    it('should render correct internship count options', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByLabelText('All');
      const internshipSelect = selects[0]; // First "All" is internships
      const options = Array.from(internshipSelect.querySelectorAll('option')).map(opt => opt.textContent);

      expect(options).toContain('0 internships');
      expect(options).toContain('1 internship');
      expect(options).toContain('2 internships');
      expect(options).toContain('3+ internships');
    });

    it('should render correct return offer options', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByLabelText('All');
      const returnOfferSelect = selects[1]; // Second "All" is return offer
      const options = Array.from(returnOfferSelect.querySelectorAll('option')).map(opt => opt.textContent);

      expect(options).toContain('Yes, still searching');
      expect(options).toContain('Yes, rescinded');
      expect(options).toContain('No return offer');
    });

    it('should render correct sponsorship options', () => {
      render(<Filters onFiltersChange={mockOnFiltersChange} />);

      const selects = screen.getAllByLabelText('All');
      const sponsorshipSelect = selects[2]; // Third "All" is sponsorship
      const options = Array.from(sponsorshipSelect.querySelectorAll('option')).map(opt => opt.textContent);

      expect(options).toContain('Need sponsorship');
      expect(options).toContain('US citizen');
      expect(options).toContain('Permanent resident');
    });
  });
});
