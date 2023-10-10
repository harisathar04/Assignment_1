$(document).ready(function() {
    function fetchAndDisplayJobListings() {
        $.getJSON('data.json', function(data) {
            const jobListingsContainer = $('#job-listings');

            data.forEach(job => {
                const jobBox = $('<div>').addClass('job-box');

                // Create HTML structure for job listing
                jobBox.html(`
                    <div class="job-logo">
                        <img src="${job.logo}" alt="Company Logo">
                    </div>
                    <div class="job-info">
                        <div class="job-top">
                            <span class="company-name">${job.company}</span>
                            ${job.new ? '<span class="new-tag">New!</span>' : ''}
                            ${job.featured ? '<span class="featured-tag">Featured</span>' : ''}
                        </div>
                        <h2 class="job-title">${job.position}</h2>
                        <ul class="job-details">
                            <li class="job-detail">${job.postedAt}</li>
                            <li class="job-detail">${job.contract}</li>
                            <li class="job-detail">${job.location}</li>
                        </ul>
                    </div>
                    <div class="job-skills">
                        <span class="job-skill">${job.role}</span>
                        <span class="job-skill">${job.level}</span>
                        ${job.languages.map(lang => `<span class="job-skill">${lang}</span>`).join('')}
                        ${job.tools.map(tool => `<span class="job-skill">${tool}</span>`).join('')}
                    </div>
                    <div class="job-delete">
                        <button class="delete-button">&times;</button>
                    </div>
                `);

                // Append job listing to the container
                jobListingsContainer.append(jobBox);
            });
        })
        .fail(function(error) {
            console.error('Error fetching data: ', error);
        });
    }

    function showAddJobPopup() {
        $('#add-job-popup').fadeIn();
        $('#overlay').fadeIn().addClass('background-disabled');
    }

    function hideAddJobPopup() {
        $('#add-job-popup').fadeOut();
        $('#overlay').fadeOut().removeClass('background-disabled');
    }

    $(document).on('click', '.delete-button', function() {
        const jobBox = $(this).closest('.job-box');
        
        jobBox.remove();
    });

    $(document).on('click', '.add-job', function() {
        showAddJobPopup();
    });

    $(document).on('click', '#close-popup', function() {
        hideAddJobPopup();
    });

    $(document).on('submit', '#job-form', function(e) {
        e.preventDefault();

        const companyName = $('#company-name').val();
        const position = $('#position').val();

        if (!companyName || !position) {
            alert('Please fill in all required fields.');
            return;
        }

        const newJob = {
            company: companyName,
            position: position,
        };

        $('#company-name').val('');
        $('#position').val('');

        hideAddJobPopup();
    });

    $(document).on('click', '.job-box', function() {
        const job = {
            position: $(this).find('.job-title').text(),
            company: $(this).find('.company-name').text(),
            location: $(this).find('.job-detail:nth-child(3)').text(),
            // Add more job details here
        };
    
        showJobDetailsPopup(job);
    });
    
    $(document).on('click', '.job-close-button', function() {
        const popup = $('.job-popup');
        popup.fadeOut();
    });
    
    function showJobDetailsPopup(job) {
        const popup = $('.job-popup');
        const popupContent = popup.find('.job-popup-content'); 
    
        popupContent.html(`
            <span class="job-close-button">×</span>
            <h2>${job.position}</h2>
            <p>${job.company}</p>
            <p>${job.location}</p>
            <!-- Add more job details here -->
        `);
    
        popup.fadeIn();
    }
    
    fetchAndDisplayJobListings();
});