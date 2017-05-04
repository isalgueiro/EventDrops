import { delimiters } from '../../../src/drawer/delimiters';

describe('Delimiter drawer', () => {
    let dateFormat;
    let scales;
    let svg;

    beforeEach(() => {
        scales = {
            x: d3.scaleTime(),
            y: d3.scaleOrdinal()
        };

        dateFormat = d3.timeFormat('%d %B %Y');

        svg = d3.select('body').append('svg');
        svg.append('g').classed('extremum', true);
    });

    it('should replace all previously existing minimum or maximum', () => {
        ['maximum', 'minimum'].forEach(extremum => {

            svg.select('.extremum')
                .append('text')
                .classed(extremum, true);

            delimiters(svg, scales, dateFormat);

            expect(svg.selectAll(`.${extremum}`).size()).toBe(1, `for ${extremum}`);
        });
    });

    it('should display formated start date of current displayed scale', () => {
        scales.x.domain([new Date('2014-01-01'), new Date('2014-04-01')]);
        delimiters(svg, scales, dateFormat);

        expect(svg.select('.extremum .minimum').text()).toBe('01 January 2014');
    });

    it('should display formated end date of current displayed scale', () => {
        scales.x.domain([new Date('2014-01-01'), new Date('2014-05-01')]);
        delimiters(svg, scales, dateFormat);

        expect(svg.select('.extremum .maximum').text()).toBe('01 May 2014');
    });
});
