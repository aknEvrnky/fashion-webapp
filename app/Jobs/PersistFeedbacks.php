<?php

namespace App\Jobs;

use App\Services\Feedback\FeedbackService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PersistFeedbacks implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        $this->onQueue('feedbacks');
    }

    /**
     * Execute the job.
     */
    public function handle(FeedbackService $feedbackService): void
    {
        $feedbackService->persist();
    }

    /**
     * Get the tags that should be assigned to the job.
     *
     * @return array<int, string>
     */
    public function tags(): array
    {
        return ['feedbacks'];
    }
}
