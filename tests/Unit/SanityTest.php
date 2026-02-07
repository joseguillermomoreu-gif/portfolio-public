<?php

declare(strict_types=1);

namespace App\Tests\Unit;

use PHPUnit\Framework\TestCase;

/**
 * Sanity test to verify PHPUnit configuration.
 *
 * This test ensures that:
 * - PHPUnit is properly installed
 * - Test suite configuration is correct
 * - Assertions work as expected
 *
 * @covers \PHPUnit\Framework\TestCase
 */
final class SanityTest extends TestCase
{
    /**
     * @test
     */
    public function it_should_pass_basic_assertion(): void
    {
        // Arrange
        $expected = true;

        // Act
        $actual = true;

        // Assert
        self::assertTrue($actual);
        self::assertSame($expected, $actual);
    }

    /**
     * @test
     */
    public function it_should_perform_arithmetic_correctly(): void
    {
        // Arrange
        $a = 2;
        $b = 3;

        // Act
        $result = $a + $b;

        // Assert
        self::assertSame(5, $result);
    }

    /**
     * @test
     */
    public function it_should_handle_strings_correctly(): void
    {
        // Arrange
        $hello = 'Hello';
        $world = 'World';

        // Act
        $greeting = sprintf('%s, %s!', $hello, $world);

        // Assert
        self::assertSame('Hello, World!', $greeting);
    }

    /**
     * @test
     */
    public function it_should_handle_arrays_correctly(): void
    {
        // Arrange
        $array = [1, 2, 3];

        // Act & Assert
        self::assertCount(3, $array);
        self::assertContains(2, $array);
        self::assertNotEmpty($array);
    }
}
